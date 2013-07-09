class ReminderMailersController < ApplicationController

class MailingsController < ApplicationController
  def deliver                                   #priority  #when to send
    Delayed::job.enqueue(MailingJob.new(params[:id], -3, 3.days.from_now)
    flash[:notice] = "Reminder will be sent."
    redirect_to mailings_url
  end

end
