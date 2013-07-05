################### use has_secure_password ######################

class User < ActiveRecord::Base
  attr_accessible :email, :password

  has_many :calendars

  validates :email, :password_digest, :presence => true

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def correct_password? (password)
    BCrypt::Password.new(self.password_digest) == password
  end
  
  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    
    self.session_token
  end

end
