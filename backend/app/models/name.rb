class Name < ActiveRecord::Base
  before_save :name_scraper
  require 'open-uri'

  def name_scraper
    doc = Nokogiri::HTML(open("https://www.behindthename.com/name/" + self.name))
  end
end