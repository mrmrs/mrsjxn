require "rubygems"
require 'rake'

desc "Automatically generate site at :8000 for local dev"
task :dev do
  #system "node web-server.js"
  system "python -m SimpleHTTPServer"
end # task :dev

desc "Start Sass so that is compiles to css upon file save"
task :sass do
  system "sass --watch scss:css"
end # task :sass

desc "Start Sass so that is compiles to css upon file save"
task :minify do
  system "sass --watch scss:css --style compressed"
end # task :minify
