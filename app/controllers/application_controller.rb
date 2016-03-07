class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session

  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie_for_ng

  protected
    def set_csrf_cookie_for_ng
      cookies['CSRF-Token'] = form_authenticity_token if protect_against_forgery?
    end
end
