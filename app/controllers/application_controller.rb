class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    @current_user = user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    render json: ['You need to login to view this page!'], status: 401 unless current_user
  end

  def logged_in?
    !current_user.nil?
  end
end
