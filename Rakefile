task :default => :web

desc "Compile scml.pegjs browser version"
task :web do
  sh "pegjs -e scml views/scml.pegjs public/scml.js"
end

desc "Remove scml.pegjs"
task :clean do
  sh "rm -f public/scml.js"
end

desc "Compile public/styles.scss into public/styles.css using sass"
task :sass do
  sh "sass  public/styles.scss public/styles.css"
end

desc "tests"
task :test do
  puts "Not implemented (yet)"
end
task :pg do
  sh "pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start"
end

task :stoppg do
  sh "pg_ctl -D /usr/local/var/postgres stop -s -m fast"
end
