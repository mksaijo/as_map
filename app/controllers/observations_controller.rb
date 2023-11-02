class ObservationsController < ApplicationController
  def index
    observations = Observation.order(date: :desc)
    features = observations.map do |obs|
      RGeo::GeoJSON::Feature.new(
        RGeo::Geographic.spherical_factory.point(obs.long, obs.lat),
        obs.id,
        count: obs.count,
        date: obs.date
      )
    end
    feature_collection = RGeo::GeoJSON::FeatureCollection.new(features)
    render json: RGeo::GeoJSON.encode(feature_collection)  
  end

  def show
    ob = Observation.find(params[:id])
    feature = RGeo::GeoJSON::Feature.new(
      RGeo::Geographic.spherical_factory.point(ob.long, ob.lat),
      ob.id,
      count: ob.count,
      date: ob.date
    )
    render json: RGeo::GeoJSON.encode(feature)
  end
end
