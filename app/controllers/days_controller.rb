class DaysController < ApplicationController
  def index
    @calendars = current_user.calendars
    render :index
  end
end
