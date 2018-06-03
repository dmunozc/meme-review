class Subscription < ApplicationRecord
  before_save :randomize_id
  private 
    def randomize_id
      if Subscription.where(id: self.id).empty?
        self.id = SecureRandom.random_number(15000000)
      end
    end
end
