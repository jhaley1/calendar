module SessionHelper
  def current_user
    return nil if session[:token].nil?
    
    User.find_by_session_token(session[:token])
  end
  
  def logged_in?
    !!current_user
  end
  
  def login!(user)
    user.reset_session_token!
    session[:token] = user.session_token
  end
  
  def logout!
    current_user.session_token = nil
    session[:token] = nil
  end

end
