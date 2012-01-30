class TasksController < ApplicationController
  def create
    puts '>>>>>>> in tasks controller create'
    @task = Task.new params[:task]
    @task.save
    render :nothing => true
  end
end
