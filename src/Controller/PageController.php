<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends Controller {
    private
        $finder,
        $folder;

    public function __construct() {
        $this->finder = new Finder;
        $this->folder = '/home/subby/Music';
        exec('ln -s ' . $this->folder . ' ' . __DIR__ . '/../../public/music');
    }

    /**
     * @Route("/{path}", name="list")
     */
    public function list($path = '') {
        return $this->render('Page/list.html.twig', [
            'path'      => $path,
            'folders'   => iterator_to_array(
                $this->getDirectories($this->folder . ($path ? ('/' . str_replace('|', '/', $path)) : ''))
            ),
            'songs'     => iterator_to_array(
                $this->getFiles($this->folder . ($path ? ('/' . str_replace('|', '/', $path)) : ''), '/\.(mp3|flac)$/')
            )
        ]);
    }

    private function getDirectories($path) {
        $this->finder->depth('== 0');
        foreach($this->finder->directories()->in($path) as $directory) {
            //dump($directory);
            yield $directory;
        }
    }

    private function getFiles($path, $filter = '*') {
        $this->finder->depth('== 0');
        $this->finder->sortByName(true);
        foreach($this->finder->files()->in($path)->name($filter) as $file) {
            //dump($file);
            yield $file;
        }
    }
}