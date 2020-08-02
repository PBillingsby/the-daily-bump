class Baby < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  validates :due_date, presence: true
  validates :mother, presence: true
  validates :father, presence: true
  
  has_many :appointments
  has_many_attached :images

  def images_urls
    self.images.map{|img| url_for(img)}
  end
end