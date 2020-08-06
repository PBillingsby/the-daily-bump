class Baby < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  validate :due_date_after_today
  validates :due_date, presence: true
  validates :mother, presence: true
  validates :father, presence: true
  
  has_many :appointments
  has_many_attached :images

  def due_date_after_today
    if self.due_date < Date.today
      errors.add(:due_date_error, "Due date cannot be in the past")
    end
  end
  def images_urls
    self.images.map{|img| [url_for(img), img.id]}
  end
end