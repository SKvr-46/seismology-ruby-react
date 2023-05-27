require 'open3'

class CalculationsController < ApplicationController
  protect_from_forgery with: :null_session

  def wavenumber_calculation
    row = params[:row].to_i
    column = params[:column].to_i
    slipDistribution = params[:slipDistribution]

    command = "python app/python/WavenumberCalculation.py #{row} #{column} #{slipDistribution}"
    stdout, stderr, status = Open3.capture3(command)

    if status.success?
      result = stdout
      render json: { result: result, row: row, column: column, slipDistribution: slipDistribution}
    else
      render json: { error: stderr }, status: :internal_server_error
    end

  end
end
