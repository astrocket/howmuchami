require 'io/console'
require "bundler/vendor/thor/lib/thor/shell"
extend Bundler::Thor::Shell

def terminal_length
  require 'io/console'
  IO.console.winsize[1]
rescue LoadError
  Integer(`tput co`)
end

def full_liner(string)
  remaining_length = terminal_length - string.length - 1
  "#{string} " + "#{'-' * remaining_length}"
end

def log_containers(app)
  puts set_color("Please type one of your #{app}'s container names", :blue, :bold)

  names = `kubectl get pods -l app=#{app} -o jsonpath='{.items[0].spec.containers[*].name}'`.split(" ")
  names_table = {}
  names.each_with_index do |name, _i|
    names_table[_i] = name
    puts set_color("[#{_i}] #{name}", :green)
  end

  names_i = STDIN.gets.strip.to_i
  sh("kubectl logs -f --tail=5 --selector app=#{app} -c #{names_table[names_i]}")
end

namespace :deploy do

  namespace :production do
    task :push => :environment do
      image_tag = "astrocket/howmuchami:0.0.1" # account/repository:tag
      raise "No image_tag" if image_tag.nil?
      sh("docker build --build-arg rails_env=production -t #{image_tag} .")
      sh("docker push #{image_tag}")
    end

    task :deploy => :environment do
      sh("kubectl apply -f k8s/deployment.yaml")
    end
  end

end