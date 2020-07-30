class Baby < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  validates :due_date, presence: true
  validates :mother, presence: true
  validates :father, presence: true
  
  has_many :appointments
  has_many_attached :images
end