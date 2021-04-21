module Api
  class UsersController < ApplicationController
    def create
      user = User.new()

      if user.save
        render json: { success: true, id: user.id }
      else
        render json: { success: false }
      end
    end
  end #End of Class
end #End of module Api