require 'httparty'
class Name < ActiveRecord::Base
  include HTTParty
  belongs_to :baby
  before_save :name_scraper

  def name_scraper
    unparsed_url = HTTParty.get("https://www.behindthename.com/name/" + self.name)
    doc = Nokogiri::HTML(unparsed_url)
    if !doc.css('section').first.nil?
      name_usage = doc.css('div.infoname')[1].text.gsub("Usage ", "")
      name_definition = doc.xpath("//div[@style='text-align:justify']").text.gsub(/\R+/, '')
      self.meaning = doc.css('section').first.children[3].text.gsub(/\R+/, '')
      self.definition = name_definition.split(" ").map{|n| n.capitalize}.join(" ")
      self.usage = doc.css('div.infoname')[1].text.gsub("Usage ", "")
    else
      self.meaning = "No Meaning Found"
      self.definition = "No Definitions Found"
      self.usage = "No Usage Found"
    end
  end
end