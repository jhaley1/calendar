class ReminderMailer < ActionMailer::Base
  default from: "jlhaley1@gmail.com"
  
  def reminder(user, event)
    @user = user
    @event = event
    @url = "http://gcalclone.herokuapp.com"
    
    mail(:to => @user.email, :subject => "Email Reminder for #{@event.title}")
  end
  
end
