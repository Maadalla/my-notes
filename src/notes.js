const notes = `
### TP8/Réplication de bases Mysql

0- Configuration de bases
	db_interne	
		- nano /etc/network/interfaces
			auto eth0 
			iface eth0 inet static
			address 192.168.11.254
			netmask 255.255.255.0
			gateway 192.168.11.1
			
	db_externe	
		- nano /etc/network/interfaces
			auto eth0 
			iface eth0 inet static
			address 192.168.10.254
			netmask 255.255.255.0
			gateway 192.168.10.1
	
	routeur
		- nano /etc/network/interfaces
			auto eth0
			iface eth0 inet static
			address 192.168.11.1
			netmask 255.255.255.0
			
			auto eth1
			iface eth1 inet static
			address 192.168.10.1
			netmask 255.255.255.0
		
		- nano /etc/sysctl.conf
			net.ipv4.ip_forward=1
			
1- Configuration : Serveur Maître
	
	- apt-get install apache2 php5 mysql-server phpmyadmin
	- mysql -u root -p
		- CREATE USER 'dbrep'@'192.168.10.254' IDENTIFIED BY 'passrep';
		- GRANT REPLICATION SLAVE ON *.* TO 'dbrep'@'192.168.10.254';
	
	- nano /etc/mysql/my.cnf
		bind-address = 192.168.11.254   
		server-id = 1                
		log_bin = /var/log/mysql/mysql-bin.log  
		expire_logs_days = 10         
		max_binlog_size = 100M
		binlog_do_db = isgadb     
	
	- FLUSH TABLES WITH READ LOCK;
	- SHOW MASTER STATUS;
		=> mysql-bin.000001 107
	
2- Configuration : Serveur Esclave 

	- nano /etc/mysql/my.cnf
		bind-address = 192.168.10.254
		server-id = 1                
		log_bin = /var/log/mysql/mysql-bin.log  
		expire_logs_days = 10         
		max_binlog_size = 100M
		binlog_do_db = isgadb 
		
	- mysql -u root -p
		CHANGE MASTER TO
		MASTER_HOST='192.168.11.254',
		MASTER_USER='dbrep',
		MASTER_PASSWORD='passrep',
		MASTER_LOG_FILE='mysql-bin.000217',
		MASTER_LOG_POS=194;
		UNLOCK TABLES;
		START SLAVE;

	- nano /etc/mysql/my.cnf
		replicate-ignore-table = isgadb.notes
`;

export default notes;