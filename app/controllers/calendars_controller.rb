class CalendarsController < ApplicationController
  def create
    @calendar = Calendar.new(params[:calendar])
    
    if @calendar.save
      redirect_to @calendar
    else
      flash[:notice] = @calendar.errors.full_messages
      render :new
    end
  end
  
  def destroy
    
  end
  
  def edit
    
  end
  
  def new
    @calendar = Calendar.new
  end
  
  def show
    @calendar = Calendar.find(params[:calendar])
  end
  
  def update
    
  end

end
