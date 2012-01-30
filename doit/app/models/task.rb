class Task < ActiveRecord::Base

  belongs_to :user
  validates :title, :presence => true
  vaildates :user_id, :presence => true
end
