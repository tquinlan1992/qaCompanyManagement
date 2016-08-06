FROM debian

RUN apt-get -y update && apt-get install -y build-essential \
		wget && \
	\
	mkdir /usr/local/nvm && \
	\
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh \
		| PROFILE=/etc/profile NVM_DIR=/usr/local/nvm sh && \
	\
	useradd -M -r API && \
	mkdir -p /src/API

COPY . /src/API/

RUN . /etc/profile && \
	cd /src/API && \
	nvm install && \
	npm install -g grunt-cli tape && \
	npm install && \
	npm rebuild node-sass && \
	grunt allProduction && \
	grunt test && \
	npm uninstall -g grunt-cli tape && \
	mkdir /opt/API-server && \
	mkdir /opt/admin-portal-server && \
	npm prune --production && \
	cp -r .nvmrc node_modules src/server/* /opt/API-server && \
	cp -r .nvmrc node_modules build/adminPortal/* /opt/admin-portal-server && \
	cp runAdminPortal.sh /bin/runAdminPortal && \
	chmod a+x /bin/runAdminPortal && \
	cd /opt/API-server && \
	rm -rf /src && \
	apt-get clean && \
	apt-get purge --auto-remove -y build-essential wget

USER API
EXPOSE 3000

CMD . /etc/profile && \
	cd /opt/API-server && \
	nvm use && \
	node server.js
