class ReminderMailer < ActionMailer::Base
  default from: "from@example.com"
  
  def reminder_email(user, event)
    @user = user
    @event = event
    @url = "http://gcalclone.herokuapp.com"
    
    mail(:to => @user.email, subject: 'Email Reminder for @event.title')
  end
  
end
