class ObservationsController < ApplicationController
  def index
    obs = Observation.order(date: :desc)
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: obs }
  end

  def show
    ob = Observation.find(params[:id])
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: ob }
  end
end
