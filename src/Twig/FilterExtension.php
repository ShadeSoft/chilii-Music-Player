<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class FilterExtension extends AbstractExtension  {

    public function getFilters() {
        return [
            new TwigFilter('tags', [$this, 'tags'])
        ];
    }

    public function tags($song) {
        $info = (new \getID3)->analyze($song);
        \getid3_lib::CopyTagsToComments($info);
        //echo '<pre>';
        //dd($info['comments']);
        return $info['comments'];
    }
}