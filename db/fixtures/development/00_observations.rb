require 'csv'

file_path = Rails.root.join("db/fixtures/development/observations.csv")
CSV.read(file_path, headers: true).each do |row|
  Observation.seed(:id) do |s|
    s.date = row[0]
    s.count = row[1]
    s.long = row[2]
    s.lat = row[3]
    s.place = row[6]
  end
end