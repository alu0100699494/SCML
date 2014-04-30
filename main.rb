require 'sinatra'
require "sinatra/reloader" if development?

helpers do
  def current?(path='/')
    (request.path==path || request.path==path+'/') ? 'class = "current"' : ''
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

