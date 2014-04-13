Users = ->
    @respondsWith = [
        "html"
        "json"
        "xml"
        "js"
        "txt"
    ]
    @index = (req, resp, params) ->
        self = this
        geddy.model.User.all (err, users) ->
            throw err  if err
            self.respondWith users,
                type: "User"
            return
        return

    @add = (req, resp, params) ->
        @respond params: params
        return

    @create = (req, resp, params) ->
        self = this
        user = geddy.model.User.create(params)
        unless user.isValid()
            @respondWith user
        else
            user.save (err, data) ->
                throw err  if err
                self.respondWith user,
                    status: err
                return
        return

    @show = (req, resp, params) ->
        self = this
        geddy.model.User.first params.id, (err, user) ->
            throw err  if err
            unless user
                throw new geddy.errors.NotFoundError()
            else
                self.respondWith user
            return

        return

    @edit = (req, resp, params) ->
        self = this
        geddy.model.User.first params.id, (err, user) ->
            throw err  if err
            unless user
                throw new geddy.errors.BadRequestError()
            else
                self.respondWith user
            return
        return

    @update = (req, resp, params) ->
        self = this
        geddy.model.User.first params.id, (err, user) ->
            throw err  if err
            user.updateProperties params
            unless user.isValid()
                self.respondWith user
            else
                user.save (err, data) ->
                    throw err  if err
                    self.respondWith user,
                        status: err
                    return
            return
        return

    @remove = (req, resp, params) ->
        self = this
        geddy.model.User.first params.id, (err, user) ->
            throw err  if err
            unless user
                throw new geddy.errors.BadRequestError()
            else
                geddy.model.User.remove params.id, (err) ->
                    throw err  if err
                    self.respondWith user
                    return
            return
        return
    return

exports.Users = Users