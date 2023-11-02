module Api
  module V1
    class ObservationsController < ApplicationController
      def index
        obs = Observation.order(date: :desc)
        render json: { status: 'SUCCESS', message: 'Loaded posts', data: obs }
      end

    end
  end
end
