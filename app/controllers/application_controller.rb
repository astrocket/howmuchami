class ApplicationController < ActionController::Base
  rescue_from Exceptions::DefaultError do |e|
    puts e.message if Rails.env.development?
    flash[:error] = e.message
    redirect_back(fallback_location: root_path)
  end
end
