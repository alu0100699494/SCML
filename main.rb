require 'sinatra'
require "sinatra/reloader" if development?
require 'data_mapper'
require 'pp'

# full path!
DataMapper.setup(:default, 
                 ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/database.db" )

class PL0Program
  include DataMapper::Resource
  
  property :name, String, :key => true
  property :source, String, :length => 1..1024
end

  DataMapper.finalize
  DataMapper.auto_upgrade!

helpers do
  def current?(path='/')
    (request.path==path || request.path==path+'/') ? 'class = "current"' : ''
  end
end


get '/grammar' do
  erb :grammar
end

get '/:selected?' do |selected|
  programs = PL0Program.all
  pp programs
  puts "selected = #{selected}"
  c  = PL0Program.first(:name => selected)
  source = if c then c.source else "a = 3-2-1" end
  erb :index, 
      :locals => { :programs => programs, :source => source }
end

post '/save' do
  pp params
  name = params[:fname]
  c  = PL0Program.first(:name => name)
  puts "prog <#{c.inspect}>"
  if c
    c.source = params["input"]
    c.save
  else
    c = PL0Program.new
    c.name = params["fname"]
    c.source = params["input"]
    c.save
  end
  pp c
  redirect '/'
end
