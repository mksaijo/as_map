class ObservationDecorator < Draper::Decorator
  delegate_all

  def pin_color
    case object.count
    when 0
      "green"
    when 1..10
      "yellow"
    when 11..50
      "orange"
    when 50..100
      "red"
    when 100..nil
      "violet"
    end
  end

end
