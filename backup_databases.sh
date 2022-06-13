docker exec inovacao-treinamentos-db-postgres pg_dump -U postgres inovacao-treinamentos | gzip > ~/inovacao-treinamentos/backup/postgres/bkp_`date +%Y-%m-%d"_"%H-%M-%S`.sql.gz

docker exec inovacao-treinamentos-db-mongodb sh -c 'exec mongodump -d inovacao-treinamentos --archive' > ~/inovacao-treinamentos/backup/mongo/bkp_`date +%Y-%m-%d"_"%H-%M-%S`.archive
                                                                                                       