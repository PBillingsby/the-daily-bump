require 'httparty'
class Name < ActiveRecord::Base
  include HTTParty
  before_save :name_scraper

  def name_scraper
    unparsed_url = HTTParty.get("https://www.behindthename.com/name/" + self.name)
    doc = Nokogiri::HTML(unparsed_url)
    if !doc.css('section').first.nil?
      text = doc.css('section').first.children[3].gsub(/\R+/, '')
      self.meaning = text.gsub('"', "")
    end
  end
end