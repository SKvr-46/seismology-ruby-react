require 'open3'

class CalculationsController < ApplicationController
  protect_from_forgery with: :null_session

  def wavenumber_calculation
    value1 = params[:value1].to_f
    value2 = params[:value2].to_f
    value3 = params[:value3].to_f

    command = "python app/python/WavenumberCalculation.py #{value1} #{value2} #{value3}"
    stdout, stderr, status = Open3.capture3(command)

    if status.success?
      result = stdout.to_f
      render json: { result: result }
    else
      render json: { error: stderr }, status: :internal_server_error
    end

  end
end
