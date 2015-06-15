var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position', function () {
  return function (css) {

    // loop through each css rule
    css.eachRule(function(rule) {

      // and each declaration in that rule
      rule.each(function(decl) {

        // get the declaration and its values
        var type = decl.prop,
            vals = decl.value.split(' '),
            pos = ['top', 'right', 'bottom', 'left'];

        // if the declaration is one of ours, process it
        if (type === 'relative' || type === 'absolute' || type === 'fixed') {

            // if only two values decalred, assign them to top|bottom right|left
            if (vals.length === 2){
                vals[2] = vals[0];
                vals[3] = vals[1];
            }

            // create the position-type declaration
            decl.cloneBefore({prop: 'position', value: type});

            // and each position offset
            var i = 0;
            for (i; i < pos.length; i++){
                decl.cloneBefore( {prop: pos[i], value: vals[i]} );
            }

            // remove our custom declaration
            decl.removeSelf();

        }

      });

    });

  };
});
