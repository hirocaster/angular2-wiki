class ItemController < ApplicationController
  def view
    item = Item.find(params[:id])
    render json: item
  end
end
