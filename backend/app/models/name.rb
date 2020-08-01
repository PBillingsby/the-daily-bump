require 'httparty'
class Name < ActiveRecord::Base
  include HTTParty
  before_save :name_scraper

  def name_scraper
    unparsed_url = HTTParty.get("https://www.behindthename.com/name/" + self.name)
    doc = Nokogiri::HTML(unparsed_url)
    # FIX RETURN VALUE FROM SCRAPER FOR DEFINITION
    if !doc.css('section').first.nil?
      name_definition = doc.xpath("//div[@style='text-align:justify']").text.gsub(/\R+/, '')
      self.meaning = doc.css('section').first.children[3].text.gsub(/\R+/, '')
      self.definition = name_definition.split(" ").map{|n| n.capitalize}.join(" ")
    else
      self.meaning = "No Meaning Found"
      self.definition = "No Definitions Found"
    end
  end
end