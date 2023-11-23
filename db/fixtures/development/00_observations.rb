require 'csv'

file_path = Rails.root.join("db/fixtures/development/observation.csv")
CSV.read(file_path, headers: true).each do |row|
  Observation.seed(:id) do |s|
    s.date = row[0]
    s.count = row[1]
    s.long = row[3]
    s.lat = row[2]
    s.place = row[4]
    s.remarks = row[5]
    s.user = row[6]
  end
end