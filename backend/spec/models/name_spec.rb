require 'rails_helper'

RSpec.describe Name, :type => :model do
  it "is not valid without a meaning" do
    name = Name.create(name: "Eric")

    expect(name).to be_valid
  end
end