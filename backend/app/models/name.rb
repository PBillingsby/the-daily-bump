require 'httparty'
class Name < ActiveRecord::Base
  include HTTParty
  before_save :name_scraper

  def name_scraper
    unparsed_url = HTTParty.get("https://www.behindthename.com/name/" + self.name)
    doc = Nokogiri::HTML(unparsed_url)
    text = doc.css('section').first.children[3].text.gsub(/^\n/, "")
    self.meaning = text.gsub('"', "")
  end
end