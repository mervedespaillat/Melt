class ChangeReviewTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :rating, :integer
  end
end
