class ReminderMailersController < ApplicationController

class MailingsController < ApplicationController
  def deliver                                   #priority  #when to send
    Delayed::job.enqueue(MailingJob.new(params[:id], -3, 3.days.from_now))

    redirect_to mailings_url
  end

end
