class ObservationsController < ApplicationController
  def index
    observations = Observation.order(date: :desc)
    features = observations.map do |obs|
      RGeo::GeoJSON::Feature.new(
        RGeo::Geographic.spherical_factory.point(obs.long, obs.lat),
        obs.id,
        count: obs.count,
        date: obs.date, 
        place: obs.place,
        color: obs.decorate.pin_color
      )
    end
    feature_collection = RGeo::GeoJSON::FeatureCollection.new(features)
    render json: RGeo::GeoJSON.encode(feature_collection)  
  end

  def show
    observation= Observation.find(params[:id])
    feature = RGeo::GeoJSON::Feature.new(
      RGeo::Geographic.spherical_factory.point(observation.long, observation.lat),
      observation.id,
      count: observation.count,
      date: observation.date,
      place: observation.place
    )
    render json: RGeo::GeoJSON.encode(feature)
  end

  def new 
    observation = Observation.new
  end

  def create
    observation = Observation.create(observation_params)
    render json: observation, status: :created
  end

  private 
  def observation_params
    params.require(:observation).permit(:long, :lat, :count, :date, :place)
  end

end
