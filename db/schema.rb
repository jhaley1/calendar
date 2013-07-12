# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130712174935) do

  create_table "calendars", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
    t.string   "name"
    t.integer  "display_id"
  end

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0
    t.integer  "attempts",   :default => 0
    t.text     "handler"
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "events", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.boolean  "recurring"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer  "calendar_id"
    t.string   "frequency"
    t.integer  "num_of_times"
    t.boolean  "reminder",     :default => false
  end

  create_table "friends_calendars", :force => true do |t|
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.integer  "friend_id"
    t.integer  "shared_calendar_id"
  end

  create_table "recurring_events", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "recurrings", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "calendar_id"
    t.datetime "start_date"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.datetime "end_date"
  end

  create_table "users", :force => true do |t|
    t.string   "session_token"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
