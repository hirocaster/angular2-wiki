class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session

  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie_for_ng

  def verified_request?
    csrf_token = if request.headers['X-CSRF-TOKEN']
                   URI.decode(request.headers['X-CSRF-TOKEN'])
                 else
                   nil
                 end

    if respond_to?(:valid_authenticity_token?, true)
      super || valid_authenticity_token?(session, csrf_token)
    else
      super || (form_authenticity_token == csrf_token)
    end
  end

  private
    def set_csrf_cookie_for_ng
      cookies['CSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end
end
