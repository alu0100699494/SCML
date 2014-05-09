require 'sinatra'
require "sinatra/reloader" if development?

helpers do
  def current?(path='/')
    (request.path==path || request.path==path+'/') ? true : false
  end
end

get '/' do
  erb :index, :layout => false
end

get '/home' do
  erb :home
end

get '/grammar' do
  erb :grammar
end

get '/test' do
  erb :test
end