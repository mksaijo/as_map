class ObservationsController < ApplicationController
  def index
    obs = Observation.order(date: :desc)
    render json: { status: 'SUCCESS', message: 'Loaded observations', data: obs }
  end

  def show
    ob = Observation.find(params[:id])
    render json: { status: 'SUCCESS', message: 'Loaded observation', data: ob }
  end
end
