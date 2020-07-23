require 'rails_helper'

RSpec.describe Baby, :type => :model do
  baby = Baby.new(due_date: "2021-04-02")
  it "is not valid without mother and father" do
    expect(baby).to_not be_valid
  end

  it "is valid with mother and father" do
    baby.update(mother: "Susan", father: "John")
    expect(baby).to be_valid
  end
end