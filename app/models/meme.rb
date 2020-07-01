class Meme < ApplicationRecord
  before_save :randomize_id
  default_scope -> { order(created_at: :desc) }
  #only 6 memes per page
  self.per_page = 6
  private 
    def randomize_id
      if Meme.where(id: self.id).empty?
        self.id = SecureRandom.random_number(15000000)
      end
    end
  
end
